<?php

/* @Framework/Form/textarea_widget.html.php */
class __TwigTemplate_7221720827c51fa55a0a567b8440a1c24bad23a769c2174d355257b81a48fbb4 extends Twig_Template
{
    public function __construct(Twig_Environment $env)
    {
        parent::__construct($env);

        $this->parent = false;

        $this->blocks = array(
        );
    }

    protected function doDisplay(array $context, array $blocks = array())
    {
        $__internal_25ff4dd76e1f47ec31008f421105e497f7e11fe312adc0a7d7a8bd782211d10f = $this->env->getExtension("native_profiler");
        $__internal_25ff4dd76e1f47ec31008f421105e497f7e11fe312adc0a7d7a8bd782211d10f->enter($__internal_25ff4dd76e1f47ec31008f421105e497f7e11fe312adc0a7d7a8bd782211d10f_prof = new Twig_Profiler_Profile($this->getTemplateName(), "template", "@Framework/Form/textarea_widget.html.php"));

        // line 1
        echo "<textarea <?php echo \$view['form']->block(\$form, 'widget_attributes') ?>><?php echo \$view->escape(\$value) ?></textarea>
";
        
        $__internal_25ff4dd76e1f47ec31008f421105e497f7e11fe312adc0a7d7a8bd782211d10f->leave($__internal_25ff4dd76e1f47ec31008f421105e497f7e11fe312adc0a7d7a8bd782211d10f_prof);

    }

    public function getTemplateName()
    {
        return "@Framework/Form/textarea_widget.html.php";
    }

    public function getDebugInfo()
    {
        return array (  22 => 1,);
    }
}
/* <textarea <?php echo $view['form']->block($form, 'widget_attributes') ?>><?php echo $view->escape($value) ?></textarea>*/
/* */
